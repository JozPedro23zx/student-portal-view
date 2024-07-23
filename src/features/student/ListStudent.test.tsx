import React, { act } from 'react';
import { cleanup, render, screen, waitFor} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { studentsApiSlice } from './studentSlice';
import ListStudent from './ListStudent';
import '@testing-library/jest-dom/extend-expect';
import { baseUrl } from '../api/apiSlice';

const server = setupServer(
  rest.get(`${baseUrl}/students`, (req, res, ctx) => {
    return res(ctx.json([
      { id: '1', first_name: 'John', last_name: 'Doe', createdAt: '2023-07-21T12:34:56Z' },
      { id: '2', first_name: 'Jane', last_name: 'Doe', createdAt: '2023-06-15T08:22:43Z' },
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createStore = () => configureStore({
  reducer: {
    [studentsApiSlice.reducerPath]: studentsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentsApiSlice.middleware),
});

const renderWithProviders = (ui: React.ReactElement) => {
  const store = createStore();
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

test('displays loading indicator while fetching students', () => {
  renderWithProviders(<ListStudent />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('displays list of students after fetching', async () => {
  await act(async () => {
    renderWithProviders(<ListStudent />);
  });
  expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
  expect(await screen.findByText(/Jane Doe/i)).toBeInTheDocument();
});

test('displays formatted creation date', async () => {
  await act(async () => {
    renderWithProviders(<ListStudent />);
  });
  expect(await screen.findByText('2023 07 21')).toBeInTheDocument();
  expect(await screen.findByText('2023 06 15')).toBeInTheDocument();
});

test('displays error message when fetch fails', async () => {
  server.use(
    rest.get(`${baseUrl}/students`, (_, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  await act(async () => {
    renderWithProviders(<ListStudent />);
  });

  await waitFor(() => {
    const error = screen.getByText("Error loading students");
    expect(error).toBeInTheDocument();
  });
});
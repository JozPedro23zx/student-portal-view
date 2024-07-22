import React from 'react';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { studentsApiSlice } from './studentSlice';
import ListStudent from './ListStudent';
import '@testing-library/jest-dom/extend-expect';

const server = setupServer(
  http.get('/students', () => {
    return HttpResponse.json([
      { id: '1', first_name: 'John', last_name: 'Doe', createdAt: '2023-07-21T12:34:56Z' },
      { id: '2', first_name: 'Jane', last_name: 'Doe', createdAt: '2023-06-15T08:22:43Z' },
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const store = configureStore({
  reducer: {
    [studentsApiSlice.reducerPath]: studentsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentsApiSlice.middleware),
});

const renderWithProviders = (ui: React.ReactElement) => {
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
  renderWithProviders(<ListStudent />);
  expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
  expect(await screen.findByText(/Jane Doe/i)).toBeInTheDocument();
});

test('displays formatted creation date', async () => {
  renderWithProviders(<ListStudent />);
  expect(await screen.findByText('2023 07 21')).toBeInTheDocument();
  expect(await screen.findByText('2023 06 15')).toBeInTheDocument();
});

test('displays error message when fetch fails', async () => {
  server.use(
    http.get('/students', () => {
      return new HttpResponse(null, {
        status: 500
      })
    })
  );

  renderWithProviders(<ListStudent />);
  expect(await screen.findByText(/Error loading students/i)).toBeInTheDocument();
});

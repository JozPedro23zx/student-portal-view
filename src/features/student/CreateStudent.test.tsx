import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import StudentCreate from './CreateStudent';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { studentsApiSlice } from './studentSlice';

const server = setupServer(
  rest.post('/students', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(req.body));
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

const renderWithProviders = (ui: React.ReactElement, { route = '/' } = {}) => {
    const store = createStore();
    return render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[route]}>
            {ui}
          </MemoryRouter>
        </Provider>
      );
};

describe('StudentCreate', () => {
  it('renders student creation form', () => {
    renderWithProviders(<Routes><Route path="/students/create" element={<StudentCreate />} /></Routes>, { route: '/students/create' });

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/House Number/i)).toBeInTheDocument();
  });

  it('submits the new student details', async () => {
    renderWithProviders(<Routes><Route path="/students/create" element={<StudentCreate />} /></Routes>, { route: '/students/create' });

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '987654321' } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Sample City' } });
    fireEvent.change(screen.getByLabelText(/Street/i), { target: { value: 'Main St' } });
    fireEvent.change(screen.getByLabelText(/House Number/i), { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    expect(screen.getByLabelText(/First Name/i)).toHaveValue('Jane');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Smith');
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue('987654321');
    expect(screen.getByLabelText(/Date of Birth/i)).toHaveValue('2000-01-01');
    expect(screen.getByLabelText(/City/i)).toHaveValue('Sample City');
    expect(screen.getByLabelText(/Street/i)).toHaveValue('Main St');
    expect(screen.getByLabelText(/House Number/i)).toHaveValue('123');
  });
});

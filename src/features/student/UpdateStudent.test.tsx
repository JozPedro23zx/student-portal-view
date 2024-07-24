// src/features/students/StudentUpdate.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import StudentUpdate from './UpdateStudent';
import { Provider } from 'react-redux';
import { baseUrl } from '../api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import { studentsApiSlice } from './studentSlice';

const server = setupServer(
  rest.get(`${baseUrl}/students/:id`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: '2000-01-01',
        phone_number: '123456789',
        street: 'Main St',
        number: 123,
        city: 'Sample City',
        createdAt: '2020-01-01',
      })
    );
  }),
  rest.patch(`${baseUrl}/students`, (req, res, ctx) => {
    return res(ctx.status(200));
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

describe('StudentUpdate', () => {
  it('renders loading state', () => {
    renderWithProviders(<Routes><Route path="/students/edit/:id" element={<StudentUpdate />} /></Routes>, { route: '/students/edit/1' });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders student details form', async () => {
    renderWithProviders(<Routes><Route path="/students/edit/:id" element={<StudentUpdate />} /></Routes>, { route: '/students/edit/1' });

    await waitFor(() => {
        expect(screen.getByLabelText(/First Name/i)).toHaveValue('John');
        expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Doe');
        expect(screen.getByLabelText(/Phone Number/i)).toHaveValue('123456789');
        expect(screen.getByLabelText(/Date of Birth/i)).toHaveValue('2000-01-01');
        expect(screen.getByLabelText(/City/i)).toHaveValue('Sample City');
        expect(screen.getByLabelText(/Street/i)).toHaveValue('Main St');
        expect(screen.getByLabelText(/House Number/i)).toHaveValue('123');
    });
  });

  it('submits the updated student details', async () => {
    renderWithProviders(<Routes><Route path="/students/edit/:id" element={<StudentUpdate />} /></Routes>, { route: '/students/edit/1' });

    await waitFor(() => screen.getByLabelText(/First Name/i));

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '987654321' } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Verifica se o formulário foi enviado corretamente
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('Jane');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Smith');
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue('987654321');
  });
});

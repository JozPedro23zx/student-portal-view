import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { CreateEnrollment } from './CreateEnrollment';
import { enrollmentApiSlice } from './enrollmentSlice';
import '@testing-library/jest-dom/extend-expect';

const baseUrl = 'http://localhost:3000';

const server = setupServer(
  rest.get(`${baseUrl}/classrooms`, (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', grade_level: '10th' },
        { id: '2', grade_level: '8th' },
      ])
    );
  }),
  rest.post(`${baseUrl}/enrollments`, (req, res, ctx) => {
    return res(ctx.status(201));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createStore = () => configureStore({
  reducer: {
    [enrollmentApiSlice.reducerPath]: enrollmentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(enrollmentApiSlice.middleware),
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

describe('Create Enrollment Form', () => {
  it('renders form and submits successfully', async () => {
    renderWithProviders(<Routes><Route path="/enrollments/create/:id" element={<CreateEnrollment />} /></Routes>, { route: '/enrollments/create/1' });

    fireEvent.change(screen.getByLabelText('Classroom'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'enrolled' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Create Enrollment')).toBeInTheDocument();
    });
  });
});

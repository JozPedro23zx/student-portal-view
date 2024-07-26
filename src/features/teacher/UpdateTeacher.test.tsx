import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TeacherUpdate from './UpdateTeacher';
import { teacherApiSlice } from './teacherSlice';
import { baseUrl } from '../api/apiSlice';

const handlers = [
  rest.get(`${baseUrl}/teachers/:id`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        subject_specialization: ['Math', 'Science'],
        date_of_birth: '1980-01-01T00:00:00.000Z',
        street: 'Main St',
        number: 123,
        city: 'Anytown',
        phone_number: '123-456-7890',
      })
    );
  }),
  rest.patch(`${baseUrl}/teachers`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createStore = () => configureStore({
  reducer: {
    [teacherApiSlice.reducerPath]: teacherApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(teacherApiSlice.middleware),
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

describe('TeacherUpdate tests', () => {
  it('should update an existing teacher', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/teachers/edit/:id" element={<TeacherUpdate />} />
      </Routes>,
      { route: '/teachers/edit/:id' }
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Smith' } });

    fireEvent.click(screen.getByText('Update'));
  });
});

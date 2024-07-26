// TeacherCreate.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { teacherApiSlice } from './teacherSlice';
import { baseUrl } from '../api/apiSlice';
import TeacherCreate from './CreateTeacher';

const handlers = [
  rest.post(`${baseUrl}/teachers`, (req, res, ctx) => {
    return res(ctx.status(201));
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

describe('TeacherCreate tests', () => {
  it('should create a new teacher', async () => {
    renderWithProviders(<Routes><Route path="/teachers/create" element={<TeacherCreate />} /></Routes>, { route: '/teachers/create' });

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Subjects'), { target: { value: 'Math,Science' } });
    fireEvent.change(screen.getByLabelText('Date Of Birth'), { target: { value: '1980-01-01' } });
    fireEvent.change(screen.getByLabelText('Street'), { target: { value: 'Main St' } });
    fireEvent.change(screen.getByLabelText('Number'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Anytown' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '123-456-7890' } });

    fireEvent.click(screen.getByText('Create'));
  });
});

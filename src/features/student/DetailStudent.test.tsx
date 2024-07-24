import { setupServer } from "msw/lib/node";
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { rest } from "msw";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import StudentDetails from "./DetailStudent";
import { studentsApiSlice } from "./studentSlice";
import { baseUrl } from "../api/apiSlice";

export const handlers = [
    rest.get(`${baseUrl}/students/:id`, (req, res, ctx) => {
      const { id } = req.params;
      if (id === '1') {
        return res(
          ctx.status(200),
          ctx.json({
            id: '1',
            first_name: 'John',
            last_name: 'Doe',
            date_of_birth: '2000-01-01',
            phone_number: '123456789',
            street: "St",
            number: 123,
            city: "Main",
            createdAt: '2022-01-01',
          })
        );
      } else {
        return res(
          ctx.status(404),
          ctx.json({ message: 'Student Not Found' })
        );
      }
    }),
  
    rest.get(`${baseUrl}/enrollments/:id`, (req, res, ctx) => {
      const { id } = req.params;
      if (id === '1') {
        return res(
          ctx.status(200),
          ctx.json({
            id: '1',
            student_id: '1',
            class_id: '1',
            enrollment_date: '2022-01-15',
            status: 'active',
            created_at: '2022-01-01',
          })
        );
      } else {
        return res(
          ctx.status(404),
          ctx.json({ message: 'Enrollment not found' })
        );
      }
    }),
  
    rest.get(`${baseUrl}/classrooms/:id`, (req, res, ctx) => {
      const { id } = req.params;
      if (id === '1') {
        return res(
          ctx.status(200),
          ctx.json({
            id: '1',
            grade_level: '10th Grade',
          })
        );
      } else {
        return res(
          ctx.status(404),
          ctx.json({ message: 'ClassRoom not found' })
        );
      }
    }),
  ];


export const server = setupServer(...handlers);

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

describe('StudentDetails', () => {
    it('renders loading state', () => {
        renderWithProviders(<Routes><Route path="/students/:id" element={<StudentDetails />} /></Routes>, { route: '/students/1' });
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders student details', async () => {
        renderWithProviders(<Routes><Route path="/students/:id" element={<StudentDetails />} /></Routes>, { route: '/students/1' });


        expect(await screen.findByText('Full Name: John Doe')).toBeInTheDocument();
        expect(screen.getByText('Phone Number: 123456789')).toBeInTheDocument();
        expect(screen.getByText('Date of Birth: 2000 01 01')).toBeInTheDocument();
        expect(screen.getByText('Address: 123 Main St')).toBeInTheDocument();
        expect(screen.getByText('Register date: 2022 01 01')).toBeInTheDocument();
        expect(screen.getByText('Class: 10th Grade')).toBeInTheDocument();
        expect(screen.getByText('Enrollment Date: 2022 01 15')).toBeInTheDocument();
        expect(screen.getByText('Status: active')).toBeInTheDocument();
    });

    it('renders not found student error', async () => {
        renderWithProviders(<Routes><Route path="/students/:id" element={<StudentDetails />} /></Routes>, { route: '/students/2' });
        expect(await screen.findByText('Student Not Found')).toBeInTheDocument();
    })

    it('renders error state', async () => {
        server.use(
            rest.get(`${baseUrl}/students/:id`, (req, res, ctx) => {
                return res(ctx.status(500), ctx.json({ message: 'Error loading student' }));
            })
        );

        renderWithProviders(<Routes><Route path="/students/:id" element={<StudentDetails />} /></Routes>, { route: '/students/1' });

        expect(await screen.findByText('Error loading student')).toBeInTheDocument();
    });
});
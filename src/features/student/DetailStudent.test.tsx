import { setupServer } from "msw/lib/node";
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
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
  
    rest.get(`${baseUrl}/enrollments/student/:id`, (req, res, ctx) => {
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

    rest.get(`${baseUrl}/grades/student/:id`, (req, res, ctx) => {
      const { id } = req.params;
      
      if (id === '1') {
        return res(
          ctx.status(200),
          ctx.json([
            {
              id: '101',
              student_id: '1',
              subject: 'english',
              exam: 85,
              assignment: 90,
              others: 75,
            },
            {
              id: '102',
              student_id: '1',
              subject: 'history',
              exam: 80,
              assignment: 85,
              others: 70,
            },
            {
              id: '103',
              student_id: '1',
              subject: 'math',
              exam: 95,
              assignment: 88,
              others: 92,
            },
          ])
        );
      } else {
        return res(
          ctx.status(404),
          ctx.json({ message: 'Grades not found for this student' })
        );
      }
    })
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

describe('Student Details tests', () => {
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

    it('renders grades correctly', async () => {
      const gradesMock = [
        { subject: 'english', exam: 85, assignment: 90, others: 75 },
        { subject: 'history', exam: 80, assignment: 85, others: 70 },
      ];
  
      server.use(
        rest.get(`${baseUrl}/grades/:id`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json(gradesMock)
          );
        })
      );
  
      renderWithProviders(<Routes><Route path="/students/:id" element={<StudentDetails />} /></Routes>, { route: '/students/1' });
      
      fireEvent.click(await screen.findByText('English'));

      expect(await screen.findByText('85')).toBeInTheDocument();
      expect(screen.getByText('90')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
  
      fireEvent.click(screen.getByText('Close'));
      fireEvent.click(screen.getByText('History'));
  
      expect(await screen.findByText('80')).toBeInTheDocument(); 
      expect(screen.getByText('85')).toBeInTheDocument(); 
      expect(screen.getByText('70')).toBeInTheDocument(); 
    });
  
    it('renders error state for grades', async () => {
      server.use(
        rest.get(`${baseUrl}/grades/student/:id`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: 'Error loading grades' }));
        })
      );
  
      renderWithProviders(<Routes><Route path="/students/:id" element={<StudentDetails />} /></Routes>, { route: '/students/1' });
      
      fireEvent.click(await screen.findByText('English'));
  
      expect(await screen.findByText('Error loading grades')).toBeInTheDocument();
    });
  
    it('renders subject not found state', async () => {
      renderWithProviders(<Routes><Route path="/students/:id" element={<StudentDetails />} /></Routes>, { route: '/students/1' });
      
      fireEvent.click(await screen.findByText('Science'));

      expect(await screen.findByText('Subject not found')).toBeInTheDocument();
    });
});
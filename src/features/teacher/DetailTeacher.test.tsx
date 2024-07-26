import { configureStore } from "@reduxjs/toolkit";
import { render, waitFor, screen } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { teacherApiSlice } from "./teacherSlice";
import { rest } from "msw";
import TeacherDetails from "./DetailTeacher";
import { baseUrl } from "../api/apiSlice";

export const handlers = [
    rest.get(`${baseUrl}/teachers/:id`, (req, res, ctx) => {
        const { id } = req.params;
        return res(
            ctx.status(200),
            ctx.json({
                id,
                first_name: 'John',
                last_name: 'Doe',
                subject_specialization: ['Math', 'Science'],
                date_of_birth: '1980-01-01T00:00:00.000Z',
                street: 'Main St',
                number: 123,
                city: 'Anytown',
                phone_number: '123-456-7890',
                createdAt: '2022-01-01T00:00:00.000Z',
            })
        );
    }),

    rest.delete(`${baseUrl}/teachers/:id`, (req, res, ctx) => {
        return res(ctx.status(204));
    }),
];


export const server = setupServer(...handlers);

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

describe('Teacher Details tests', () => {
    it('should render teacher details', async () => {
        renderWithProviders(<Routes><Route path="/teachers/:id" element={<TeacherDetails />} /></Routes>, { route: '/teachers/1' });

        await waitFor(() => {
            expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
            expect(screen.getByText('Subjects: Math, Science')).toBeInTheDocument();
            expect(screen.getByText('Date of birth: 1980/01/01')).toBeInTheDocument();
            expect(screen.getByText('Address: Main St, 123 - Anytown')).toBeInTheDocument();
            expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument();
        });
    });

    it('should handle not found teacher', async () => {
        server.use(
            rest.get(`${baseUrl}/teachers/:id`, (req, res, ctx) => {
                return res(ctx.status(404), ctx.json({ message: 'Teacher not found' }));
            })
        );

        renderWithProviders(<Routes><Route path="/teachers/:id" element={<TeacherDetails />} /></Routes>, { route: '/teachers/1' });

        await waitFor(() => {
            expect(screen.getByText('Teacher not found')).toBeInTheDocument();
        });
    });
})
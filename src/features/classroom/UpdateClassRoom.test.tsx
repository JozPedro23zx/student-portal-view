import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { baseUrl } from "../api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { classroomApiSlice } from "./classroomSlice";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UpdateClassRoom } from "./UpdateClassRoom";

const server = setupServer(
    rest.get(`${baseUrl}/classrooms/:id`, (req, res, ctx) => {
        return res(
            ctx.json({ id: '1', grade_level: '10th', start_date: '2023-07-21T12:34:56Z', end_date: '2023-08-21T12:34:56Z' },)
        );
    }),
    rest.patch(`${baseUrl}/classrooms`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createStore = () => configureStore({
    reducer: {
        [classroomApiSlice.reducerPath]: classroomApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(classroomApiSlice.middleware),
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

describe('Class Room Update test', () => {
    it('renders loading state', () => {
        renderWithProviders(<Routes><Route path="/classroom/edit/:id" element={<UpdateClassRoom />} /></Routes>, { route: '/classroom/edit/1' });

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders classroom data in form fields', async () => {
        renderWithProviders(<Routes><Route path="/classroom/edit/:id" element={<UpdateClassRoom />} /></Routes>, { route: '/classroom/edit/1' });

        await waitFor(() => {
            expect(screen.getByDisplayValue('10th')).toBeInTheDocument();
            expect(screen.getByDisplayValue('2023-07-21')).toBeInTheDocument();
            expect(screen.getByDisplayValue('2023-08-21')).toBeInTheDocument();
        });
    });

    it('handles input changes', async () => {
        renderWithProviders(<Routes><Route path="/classroom/edit/:id" element={<UpdateClassRoom />} /></Routes>, { route: '/classroom/edit/1' });

        await waitFor(() => {
            fireEvent.change(screen.getByLabelText(/grade level/i), { target: { value: '11th' } });
            fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: '2023-08-01' } });
            fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: '2023-08-31' } });
        });

        expect(screen.getByDisplayValue('11th')).toBeInTheDocument();
        expect(screen.getByDisplayValue('2023-08-01')).toBeInTheDocument();
        expect(screen.getByDisplayValue('2023-08-31')).toBeInTheDocument();
    });
})
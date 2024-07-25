import { configureStore } from "@reduxjs/toolkit";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { classroomApiSlice } from "./classroomSlice";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CreateClassRoom } from "./CreateClassRoom";

const baseUrl = 'http://localhost:3000';

const server = setupServer(
    rest.post(`${baseUrl}/classrooms`, (req, res, ctx) => {
        return res(ctx.status(201));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Helper function to render with providers
const createStore = () => configureStore({
    reducer: {
        [classroomApiSlice.reducerPath]: classroomApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(classroomApiSlice.middleware),
});

const renderWithProviders = (ui: React.ReactElement) => {
    const store = createStore();
    return render(
        <Provider store={store}>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </Provider>
    );
};

describe("Create Class Room test", () => {

    test('renders CreateClassRoom form', () => {
        renderWithProviders(<CreateClassRoom />);

        expect(screen.getByLabelText(/grade level/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    });

    test('handles input changes', () => {
        renderWithProviders(<CreateClassRoom />);

        const gradeLevelInput = screen.getByLabelText(/grade level/i);
        const startDateInput = screen.getByLabelText(/start date/i);
        const endDateInput = screen.getByLabelText(/end date/i);

        fireEvent.change(gradeLevelInput, { target: { value: '10th' } });
        fireEvent.change(startDateInput, { target: { value: '2023-07-21' } });
        fireEvent.change(endDateInput, { target: { value: '2023-07-22' } });

        expect(screen.getByLabelText(/grade level/i)).toHaveValue('10th');
        expect(screen.getByLabelText(/start date/i)).toHaveValue('2023-07-21');
        expect(screen.getByLabelText(/end date/i)).toHaveValue('2023-07-22');;
    });
})
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { baseUrl } from "../api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { classroomApiSlice } from "./classroomSlice";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ListClassRoom } from "./ListClassRoom";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const server = setupServer(
    rest.get(`${baseUrl}/classrooms`, (req, res, ctx) => {
      return res(ctx.json([
        { id: '1', grade_level: '10th', start_date: '2023-07-21T12:34:56Z', end_date: '2023-07-21T12:34:56Z' },
        { id: '2', grade_level: '8th', start_date: '2023-06-15T08:22:43Z', end_date: '2023-06-15T08:22:43Z' },
      ]));
    })
);

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

describe("Class Room List tests", ()=>{
    test('renders loading state initially', () => {
        renderWithProviders(<ListClassRoom />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
      });
      
      test('renders classrooms data', async () => {
        renderWithProviders(<ListClassRoom />);
      
        await waitFor(() => {
          expect(screen.getByText('Classrooms')).toBeInTheDocument();
          expect(screen.getByText('10th')).toBeInTheDocument();
          expect(screen.getByText('2023 07 21 - 2023 07 21')).toBeInTheDocument();
          expect(screen.getByText('8th')).toBeInTheDocument();
          expect(screen.getByText('2023 06 15 - 2023 06 15')).toBeInTheDocument();
        });
      });
      
      test('renders error state', async () => {
        server.use(
          rest.get(`${baseUrl}/classrooms`, (req, res, ctx) => {
            return res(ctx.status(500));
          })
        );
      
        renderWithProviders(<ListClassRoom />);
      
        await waitFor(() => {
          expect(screen.getByText('Error loading classrooms')).toBeInTheDocument();
        });
      });
})
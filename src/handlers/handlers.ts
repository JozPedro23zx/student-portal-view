// src/mocks/handlers.ts
import { rest } from 'msw';

const studentEndpoint = "/students"
const enrollmentEndpoint = "/enrollments"
const classEndpoint = "/classrooms"


export const handlers = [
  rest.get(`${studentEndpoint}/1`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          date_of_birth: '2000-01-01',
          phone_number: '123456789',
          address: '123 Main St',
          createdAt: '2022-01-01',
        })
      );
  }),

  rest.get(`${enrollmentEndpoint}/1`, (req, res, ctx) => {
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
  }),

  rest.get(`${classEndpoint}/1`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: '1',
          grade_level: '10th Grade',
        })
      );
  }),
];

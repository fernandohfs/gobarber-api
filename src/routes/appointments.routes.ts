import { Router } from 'express';
import { parseISO } from 'date-fns';
import { CREATED, BAD_REQUEST } from 'http-status';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const appointment = await CreateAppointmentService.execute({
      date: parsedDate,
      provider,
    });

    return response.status(CREATED).json(appointment);
  } catch (err) {
    return response.status(BAD_REQUEST).json({ error: err.message });
  }
});

export default appointmentsRouter;

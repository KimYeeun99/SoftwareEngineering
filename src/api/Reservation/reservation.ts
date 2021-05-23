import { Response, Request } from "express";
import * as yup from "yup";
import { db } from "../../db/db";
import { Reservation } from "../../model/reservation";

const registerScheme = yup.object({
  user: yup.object().shape({
    id: yup.string().required(),
    password: yup.string().required(),
    isHost: yup.boolean().required(),
  }),
  name: yup.string().required(),
  businessNum: yup.string().required(),
});

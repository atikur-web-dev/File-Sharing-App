import { z } from "zod";

export const ZRegisterUser = z.object({
    displayName: z 
    .string()
    .min(1, "Display Name")
})
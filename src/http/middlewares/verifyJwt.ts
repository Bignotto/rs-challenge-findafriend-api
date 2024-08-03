import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({
      onlyCookie: false,
    });
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}

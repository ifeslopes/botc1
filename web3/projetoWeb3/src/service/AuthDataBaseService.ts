import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv-safe";
dotenv.config();

const jwt = {
  secret: process.env.JWT_SECRET || "091",
};

const prisma = new PrismaClient();

class AuthBaseService {
  constructor() {}

  async email(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return { success: false, message: "user não encontrado." };
      }

      const senhaCorreta = await bcrypt.compare(password, user.password);

      if (!senhaCorreta) {
        return { success: false, message: "Senha incorreta." };
      }

      const usuario = {
        id: user.id,
        nome: user.name,
        
      };

      const token = sign(usuario, jwt.secret, {
        expiresIn: "30m",
      });

      return {
        user: user,
        success: true,
        token: token,
        message: "Login bem sucedido.",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Erro ao realizar Login." };
    }
  }

  async logout() {
    // Lógica para logout, se necessário
  }
}

export default new AuthBaseService();

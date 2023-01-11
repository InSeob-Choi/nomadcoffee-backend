import client from "../client";
import bcrypt from "bcrypt";

const resolvers = {
  Query: {},
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, avatarURL, githubUsername, password }
    ) => {
      try {
        // 1. username & email이 DB에 있는지 확인
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          throw new Error("이미 사용중인 username/email 입니다.");
        }
        // 2. 비밀번호 hash
        const hashedPassword = await bcrypt.hash(password, 10);
        // 3. user 저장 및 user 반환
        const user = await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            avatarURL,
            githubUsername,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "계정을 생성할 수 없습니다.",
        };
      }
    },
  },
};

export default resolvers;

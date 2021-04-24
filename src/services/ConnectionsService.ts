import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection"
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionRepository: Repository<Connection>

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {

    const connection = this.connectionRepository.create({
      id,
      socket_id,
      admin_id,
      user_id
    });

    await this.connectionRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connection = this.connectionRepository.findOne({ user_id });

    return connection;
  }

  async findAllWithoutAdmin() {
    const connection = await this.connectionRepository.find({
      where: { admin_id: null },
      relations: ["user"]
    });

    return connection;
  }

  async findBySocketId(socket_id: string) {
    const connection = this.connectionRepository.findOne({ socket_id });

    return connection;
  }

}


export { ConnectionsService }
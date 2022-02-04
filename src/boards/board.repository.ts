import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

  /**
   * 게시물 생성
   * @param createBoardDto 게시물 생성시 참조하는 dto
   * @returns 
   */
  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user
    });
    await this.save(board);
    return board;
  }

}
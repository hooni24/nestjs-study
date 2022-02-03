import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {

  // Repository 클래스 DI
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) { }

  // // board모델을 만들었으니 타입을 선언해 준다.
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  /**
   * 새로운 게시물 작성
   * @param title 게시물 제목
   * @param description 게시물 내용
   * @returns 생성된 게시물 객체
   */
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  /**
   * id로 게시물 하나 찾기
   * @param id 찾을 게시물의 id
   * @returns 찾은 게시물
   */
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
    return found;
  }

  // /**
  //  * id로 게시물 하나 지우기
  //  * @param id 삭제할 게시물 id
  //  */
  // deleteBoardById(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter(b => b.id !== found.id);
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

}

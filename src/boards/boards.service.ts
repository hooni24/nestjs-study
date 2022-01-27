import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {

  // private을 사용한이유 : 다른 컴포넌트에서 수정못하도록.
  private boards: Board[] = [];

  // board모델을 만들었으니 타입을 선언해 준다.
  getAllBoards(): Board[] {
    return this.boards;
  }

  /**
   * 새로운 게시물 작성
   * @param title 게시물 제목
   * @param description 게시물 내용
   * @returns 생성된 게시물 객체
   */
  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC
    };
    this.boards.push(board);
    return board;
  }

  /**
   * id로 게시물 하나 찾기
   * @param id 찾을 게시물의 id
   * @returns 찾은 게시물
   */
  getBoardById(id: string): Board {
    return this.boards.find(b => b.id === id);
  }

  /**
   * id로 게시물 하나 지우기
   * @param id 삭제할 게시물 id
   */
  deleteBoardById(id: string): void {
    this.boards = this.boards.filter(b => b.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }

}

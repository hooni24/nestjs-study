import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

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
  createBoard(title: string, description: string): Board {
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC
    };
    this.boards.push(board);
    return board;
  }

}

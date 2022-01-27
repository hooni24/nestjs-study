import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {

  // private을 사용한이유 : 다른 컴포넌트에서 수정못하도록.
  private boards = [];

  getAllBoards() {
    return this.boards;
  }

}

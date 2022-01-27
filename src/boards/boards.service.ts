import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {

  // private을 사용한이유 : 다른 컴포넌트에서 수정못하도록.
  private boards: Board[] = [];

  // board모델을 만들었으니 타입을 선언해 준다.
  getAllBoards(): Board[] {
    return this.boards;
  }

}

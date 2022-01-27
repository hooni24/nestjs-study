import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  /* 
    ts에서는 접근제한자 private을 붙여 생성자 인자로 선언하면
    암묵적으로 프로퍼티로 선언되며 주입을 해 준다. (this의 필드로 넣어준다는 뜻)
  */
  constructor(private boardsService: BoardsService) { }

  /**
   * 모든 게시물을 반환하는 엔드포인트.
   * @returns 모든 게시물
   */
  @Get()
  getAllBoard() {
    return this.boardsService.getAllBoards();
  }

}



/*
  ** 참고 **
  위 코드는 아래와 같은데.. ts의 도움을 받아 위처럼 선언해도 자동으로 타입 바인딩이 된다
*/
// @Controller('boards')
// export class BoardsController {
//   boardService: BoardsService;
//   constructor(boardsService: BoardsService) {
//     this.boardsService = boardsService;
//   }
// }
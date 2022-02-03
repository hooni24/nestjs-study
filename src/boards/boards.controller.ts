import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  /* 
    ts에서는 접근제한자 private을 붙여 생성자 인자로 선언하면
    암묵적으로 프로퍼티로 선언되며 주입을 해 준다. (this의 필드로 넣어준다는 뜻)
  */
  constructor(private boardsService: BoardsService) { }

  // /**
  //  * 모든 게시물을 반환하는 엔드포인트.
  //  * @returns 모든 게시물
  //  */
  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  // /**
  //  * 게시물 생성하기
  //  * @param title 게시물 제목
  //  * @param description 게시물 내용
  //  * @returns 생성된 게시물
  //  */
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(
  //   // Body를 쌩으로 붙여놓으면 prop을 찾아서 자동으로 매핑된다.
  //   @Body() createBoardDto: CreateBoardDto
  // ): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  /**
   * id로 게시물 찾기 
   * @param id 찾을 게시물의 id
   * @returns 찾은 게시물
   */
  @Get('/:id')
  getBoardById(
    @Param('id') id: number
  ): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // @Delete('/:id')
  // deleteBoardById(
  //   @Param('id') id: string
  // ): void {
  //   this.boardsService.deleteBoardById(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }

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
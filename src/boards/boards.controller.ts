import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
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
  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  /**
   * 로그인한 유저의 모든 게시물 반환
   * @param user 
   * @returns 
   */
  @Get('/mine')
  getMyBoard(
    @GetUser() user: User
  ): Promise<Board[]> {
    return this.boardsService.getMyBoards(user);
  }

  /**
   * 게시물 생성하기
   * @param title 게시물 제목
   * @param description 게시물 내용
   * @returns 생성된 게시물
   */
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    // Body를 쌩으로 붙여놓으면 prop을 찾아서 자동으로 매핑된다.
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  /**
   * id로 게시물 찾기 
   * @param id 찾을 게시물의 id
   * @returns 찾은 게시물
   */
  @Get('/:id')
  getBoardById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.boardsService.deleteBoardById(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
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
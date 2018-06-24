/* ECS 140B Assignment 1 */
/* Sudoku Solver */

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Tim Mavrin    913633878

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% test WORKS

% test1, test2, test3 WORK and RUN in under 2 SECONDS!

% !!! I made a test4 which is all blank spaces and it runs in under a second !!!

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/* This runs all the simple tests. If it
works correctly, you should see three identical
and completed sudoku tables, and finally the
word false (as test0c will fail.) */
test :-
	test0, nl,
	test0a, nl,
	test0b, nl,
	test0c.

/* This is a completly solved solution. */
test0 :-
	L = [
             [9,6,3,1,7,4,2,5,8],
             [1,7,8,3,2,5,6,4,9],
             [2,5,4,6,8,9,7,3,1],
             [8,2,1,4,3,7,5,9,6],
             [4,9,6,8,5,2,3,1,7],
             [7,3,5,9,6,1,8,2,4],
             [5,8,9,7,1,3,4,6,2],
             [3,1,7,2,4,6,9,8,5],
             [6,4,2,5,9,8,1,7,3]],
        sudoku(L),
        printsudoku(L).

/* This has a solution (the one in test0) which
should be found very quickly. */
test0a :-
	L = [
             [9,_,3,1,7,4,2,5,8],
             [_,7,_,3,2,5,6,4,9],
             [2,5,4,6,8,9,7,3,1],
             [8,2,1,4,3,7,5,_,6],
	     [4,9,6,8,5,2,3,1,7],
             [7,3,_,9,6,1,8,2,4],
             [5,8,9,7,1,3,4,6,2],
             [3,1,7,2,4,6,9,8,5],
             [6,4,2,5,9,8,1,7,3]],
        sudoku(L),
        printsudoku(L).

/* This has a solution (the one in test0) and
may take a few seconds to find. */
test0b :-
	L = [
             [9,_,3,1,7,4,2,5,_],
             [_,7,_,3,2,5,6,4,9],
             [2,5,4,6,_,9,_,3,1],
             [_,2,1,4,3,_,5,_,6],
             [4,9,_,8,_,2,3,1,_],
             [_,3,_,9,6,_,8,2,_],
             [5,8,9,7,1,3,4,6,2],
             [_,1,7,2,_,6,_,8,5],
             [6,4,2,5,9,8,1,7,3]],
        sudoku(L),
        printsudoku(L).

/* This one obviously has no solution (column 2 has
two nines in it.) and it may take a few seconds
to deduce this. */
test0c :-
	L = [
             [_,9,3,1,7,4,2,5,8],
             [_,7,_,3,2,5,6,4,9],
             [2,5,4,6,8,9,7,3,1],
             [8,2,1,4,3,7,5,_,6],
	     [4,9,6,8,5,2,3,1,7],
             [7,3,_,9,6,1,8,2,4],
             [5,8,9,7,1,3,4,6,2],
             [3,1,7,2,4,6,9,8,5],
             [6,4,2,5,9,8,1,7,3]],
        sudoku(L),
        printsudoku(L).



/* Here is an extra test for you to try. It would be
nice if your program can solve this puzzle, but it's
not a requirement. */

test0d :-
	L = [
             [9,_,3,1,_,4,2,5,_],
             [_,7,_,3,2,5,6,4,9],
             [2,5,4,6,_,9,_,3,1],
             [_,2,1,4,3,_,5,_,6],
             [4,9,_,8,_,2,3,1,_],
             [_,3,_,9,6,_,8,2,_],
             [5,8,9,7,1,3,4,6,2],
             [_,1,7,2,_,6,_,8,5],
             [6,4,2,5,_,8,1,7,3]],
        sudoku(L),
        printsudoku(L).


/* The next 3 tests are supposed to be progressively
harder to solve. The solver we demonstrated in class
did not find a solution in a reasonable length of time for
any of these, so if you manage to write a solver
that does them in a reasonable length of time,
expect to receive bonus points (what’s a reasonable
length of time?  Let’s call it 5 minutes. (BUT YOU
MUST TELL US IN YOUR SUBMISSION THAT YOUR SOLVER
WORKS ON THESE TESTS OR WE WON'T RUN THESE TESTS
AND YOU WON’T GET THE BONUS POINTS YOU DESERVE.) */
test1 :-
	L = [
             [_,6,_,1,_,4,_,5,_],
             [_,_,8,3,_,5,6,_,_],
             [2,_,_,_,_,_,_,_,1],
             [8,_,_,4,_,7,_,_,6],
	     [_,_,6,_,_,_,3,_,_],
             [7,_,_,9,_,1,_,_,4],
             [5,_,_,_,_,_,_,_,2],
             [_,_,7,2,_,6,9,_,_],
             [_,4,_,5,_,8,_,7,_]],
        sudoku(L),
        printsudoku(L).

test2 :-
	L = [
             [_,_,4,_,_,3,_,7,_],
             [_,8,_,_,7,_,_,_,_],
             [_,7,_,_,_,8,2,_,5],
             [4,_,_,_,_,_,3,1,_],
	     [9,_,_,_,_,_,_,_,8],
             [_,1,5,_,_,_,_,_,4],
             [1,_,6,9,_,_,_,3,_],
             [_,_,_,_,2,_,_,6,_],
             [_,2,_,4,_,_,5,_,_]],
        sudoku(L),
        printsudoku(L).

test3 :-
	L = [
             [_,4,3,_,8,_,2,5,_],
	     [6,_,_,_,_,_,_,_,_],
             [_,_,_,_,_,1,_,9,4],
             [9,_,_,_,_,4,_,7,_],
             [_,_,_,6,_,8,_,_,_],
             [_,1,_,2,_,_,_,_,3],
             [8,2,_,5,_,_,_,_,_],
             [_,_,_,_,_,_,_,_,5],
             [_,3,4,_,9,_,7,1,_]],
        sudoku(L).

test4 :-
	L = [
             [_,_,_,_,_,_,_,_,_],
	     [_,_,_,_,_,_,_,_,_],
             [_,_,_,_,_,_,_,_,_],
             [_,_,_,_,_,_,_,_,_],
             [_,_,_,_,_,_,_,_,_],
             [_,_,_,_,_,_,_,_,_],
             [_,_,_,_,_,_,_,_,_],
             [_,_,_,_,_,_,_,_,_],
             [_,_,_,_,_,_,_,_,_]],
        sudoku(L),
        printsudoku(L).



% print sudoku table
printsudoku([]).
printsudoku([H|T]) :-
	write(H),nl,
	printsudoku(T).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Expects a list of lists 9 by 9 grid.
sudoku(L):- rows(1,1,L).

%%%%%%%%%%% BEGIN ELEMENTWISE %%%%%%%%%%%%%%
% Recurses on all of the rows of the matrix.
rows(_,10,_).
rows(X,Y,M) :- nth1(Y,M,R), elem(X,Y,M,R), Z is Y+1, rows(X,Z,M).

% Recurses on all of the elements of the row that was passed in. It also validates each element.
elem(10,_,_,_).
elem(X,Y,M,R) :- nth1(X,R,E), validval(E), validate(X,Y,E,M),  Z is X+1, elem(Z,Y,M,R).

% Recurses through the list and deletes only the first element that matches with the target E.
% It then appends the tail with every element that before the deleted target.
filter(E,[H|T],L) :- E == H, L = T.
filter(E,[H|T],L) :- filter(E,T,List), append([[H],List],L) .


%%%%%%%%%%% VALIDATE %%%%%%%%%%%%%%
% Gets the row, column, and box at the X Y position, removes the variable that is at that position from each of the lists.
% Then it appends the row, column, and box into a new list.
% Then it checks if the element at the X Y position is not part of that list.
validate(X,Y,E,M) :- getrow(Y,M,R), getcol(X,M,C), getbox(X,Y,M,B),
		     filter(E,C,Co), filter(E,R,Ro), filter(E,B,Bo),
		     append([Ro,Co,Bo],L), not(mem(E,L)).


%%%%%%%%%%% GET %%%%%%%%%%%%%%
% Self explanitory.
% Getrow uses nth1 to get the first list in the list of lists.
% Getcol uses nth1 to get the nth element out of the list.
% Getbox uses isbox to see which box is at the X Y position. It then uses box to retrieve the numbered box as a list.
getrow(N,M,R) :- nth1(N,M,R).
getcol(N,M,C) :- maplist(nth1(N),M,C).
getbox(X,Y,M,B) :- isbox(X,Y,N), box(N,M,B).

%%%%%%%%%%% BOX %%%%%%%%%%%%%%
% Says what box it is at that position. Returns the box that the X Y position is a member of.
isbox(X,Y,1) :- member(X,[1,2,3]), member(Y,[1,2,3]).
isbox(X,Y,2) :- member(X,[4,5,6]), member(Y,[1,2,3]).
isbox(X,Y,3) :- member(X,[7,8,9]), member(Y,[1,2,3]).
isbox(X,Y,4) :- member(X,[1,2,3]), member(Y,[4,5,6]).
isbox(X,Y,5) :- member(X,[4,5,6]), member(Y,[4,5,6]).
isbox(X,Y,6) :- member(X,[7,8,9]), member(Y,[4,5,6]).
isbox(X,Y,7) :- member(X,[1,2,3]), member(Y,[7,8,9]).
isbox(X,Y,8) :- member(X,[4,5,6]), member(Y,[7,8,9]).
isbox(X,Y,9) :- member(X,[7,8,9]), member(Y,[7,8,9]).

% Gets the box at that number.
% Hardcoded. Basically I take the rows that the box is in, then take only the boxes elements out and put them into a list.
box(1,M,L):- getrow(1,M,R),getrow(2,M,S),getrow(3,M,T),
	     R = [A,B,C|_], S=[D,E,F|_], T=[G,H,I|_],
	     L = [A,B,C,D,E,F,G,H,I].

box(2,M,L):- getrow(1,M,R),getrow(2,M,S),getrow(3,M,T),
	     R = [_,_,_,A,B,C|_], S = [_,_,_,D,E,F|_], T = [_,_,_,G,H,I|_],
	     L = [A,B,C,D,E,F,G,H,I].

box(3,M,L):- getrow(1,M,R),getrow(2,M,S),getrow(3,M,T),
	     R = [_,_,_,_,_,_|A], S = [_,_,_,_,_,_|B], T = [_,_,_,_,_,_|C],
	     append([A,B,C],L).

box(4,M,L):- getrow(4,M,R),getrow(5,M,S),getrow(6,M,T),
	     R = [A,B,C|_], S=[D,E,F|_], T=[G,H,I|_],
	     L = [A,B,C,D,E,F,G,H,I].

box(5,M,L):- getrow(4,M,R),getrow(5,M,S),getrow(6,M,T),
	     R = [_,_,_,A,B,C|_], S = [_,_,_,D,E,F|_], T = [_,_,_,G,H,I|_],
	     L = [A,B,C,D,E,F,G,H,I].

box(6,M,L):- getrow(4,M,R),getrow(5,M,S),getrow(6,M,T),
	     R = [_,_,_,_,_,_|A], S = [_,_,_,_,_,_|B], T = [_,_,_,_,_,_|C],
	     append([A,B,C],L).

box(7,M,L):- getrow(7,M,R),getrow(8,M,S),getrow(9,M,T),
	     R = [A,B,C|_], S=[D,E,F|_], T=[G,H,I|_],
	     L = [A,B,C,D,E,F,G,H,I].

box(8,M,L):- getrow(7,M,R),getrow(8,M,S),getrow(9,M,T),
	     R = [_,_,_,A,B,C|_], S = [_,_,_,D,E,F|_], T = [_,_,_,G,H,I|_],
	     L = [A,B,C,D,E,F,G,H,I].

box(9,M,L):- getrow(7,M,R),getrow(8,M,S),getrow(9,M,T),
	     R = [_,_,_,_,_,_|A], S = [_,_,_,_,_,_|B], T = [_,_,_,_,_,_|C],
	     append([A,B,C],L).

%%%%%%%%%%% MY MEMBER FUNCTION %%%%%%%%%%%%%%
% A member function that doesn't unify to anything.
% Recurses through the list and compares each element in the list to the target.
mem(X,[H|_]) :- X == H.
mem(X,[_|T]) :- mem(X,T).

%%%%%%%%%%% VALID %%%%%%%%%%%%%%
% Makes sure the number is valid in sudoku.
validval(1).
validval(2).
validval(3).
validval(4).
validval(5).
validval(6).
validval(7).
validval(8).
validval(9).

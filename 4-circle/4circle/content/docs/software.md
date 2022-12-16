+++
title = "Software Design"
description = "The software design of our project"
date = 2022-12-16T00:39:49-05:00
weight = 10
draft = false
bref = ""
toc = true
+++

## Overview and Goals
The primary software component of our project was an algorithm that could play the Connect 4 algorithm against our human player.

We wanted to make our algorithm as good at the game as possible, so we set our goal to build a perfect weak solver; that is, a solver that was capable of ensuring the best possible result from any situation, though not necessarily taking the shortest path to get there.

For instance, if a win possible from a particular position, our player should always win, but there is no distinction between winning in more or less moves. If only a draw is possible, then our player should draw.

### Language
We chose to write our algorithm in [Go](https://go.dev), for its combination of being a very fast language as well as its relative familiarity to our team members. Other options that were considered were Python, which was ruled out as it was far too slow, and C++, which we ultiamtely chose not to use to do complexity and familiarity

## Algorithm Design
At its core, the solving algorithm is a Negamax algorithm (a variant on Minimax that takes advantage of the fact that for turn-based, 2 player games, a player's score for any position is the negative score of the other player) that traverses through the game tree to find the ultimate outcome of each potential move assuming both players play optimally, then plays whichever move will result in the highest final score. This is similar to how many game engines work, from Tic-Tac-Toe all the way to Chess or Go.

However, raw Negamax is a fairly inefficient algorithm that repeats many calculations. Left to its own devices, it would take an impractically large amount of time to play a Connect 4 game. To combat this, we added many different kinds of optimizations to our Negamax algorithm until we could play a game of Connect 4 in a reasonable amount of time. Those optimizations are described below

### Alpha Beta Pruning
Alpha beta pruning is one of the classic optimizations made to the Minimax/Negamax algorithm that seeks to decrease the number of nodes explored. It does this by not exploring, or "pruning" parts of the game tree that wouldn't have been relevant to the final path because one player already had a better move available.

![Alpha Beta Pruning Example](/images/pruned.png)

This example tree shows pruned nodes in green; looking at the left side on the second level, we can see that if the blue opponent, which is seeking to minimize our score, picks its left child, we can force a score of 5. As we explore its right child, we see we can force an 8. At this point, the algorithm realizes that the blue player would never choose this right path - it is guaranteed a 5 if it goes down the other path, where as it now knows that this one will always be 8 or higher. 

Something similar happens on the right with the root node - it knows choosing its left child will guarantee it a 5, and after exploring all of the non-pruned portions, it knows if it chooses the right, the blue player can force a score of -1. At this point, the remainder of the tree is relevant. The red player will never choose the right which wil result in a -1 or lower when the left guarantees at least a 5.

### Bitboards
The next thing we did was represent the board states using bitboards - two 64-bit integers. The first number was the position board for the current player, with a 1 where they had played to that point and a 0 where they hadn't. The second was a board mask, which had a 1 in the spots that either player had played in, and a 0 in empty spaces.

This representation allwoed us to to things like check if a player had won, see which moves were possible, see where a player's potential winning/losing moves could be, and even play moves onto the board with just a few binary math and shift expressions, which are very cheap for the computer to execute and take up very little memory.

### Transposition Table (LRU Cache)
For any given Connect 4 position, there are more than likely many different ways to reach it. However, once you are at that position, the best moves from that position are never the same, so there is no need to recalculate those moves. We took advantage of this, and implemented an LRU (**L**east **R**ecently **U**sed)Cache which holds the 10 million[^1] most recently explored positions and their respective evaluations in memory. For each new position, if we find it in out cache, we can skip a large amount of computation and just take the value in our cache[^2].

### Anticipating Losing Moves
The next area we targeted was sniffing out potential blunders and exploring them through Negamax at all to save a bit more time. We aimed to address these two situations:

1. If an opponent will win by playing into a column on their next turn, we should play in that column to block their win.

2. If an opponent has a winning position directly above the bottommost empty space in a column, we should not play in that column.

We accomlished this using more bit-wise operations; through a series of bit shifts and comparisions, we pulled out every combination of 3 pieces that the opponent had that were one piece away from a Connect 4. Then, we checked if any could be played on the next turn (if so, then block that column!). If there were immediate blocks that needed to be made, then begin Negamax searching the rest of the columns (but exclude those that are directly below an opponent's win position).

### Move ordering
The final big optimization we made was playing with the order we explored the nodes in. Because of the way the alpha-beta pruning works, the total number of pruned nodes increases drastically when the best moves are explored first (which means less nodes have to be explored by the algorithm). So it would follow hat we should make every effort to explore the best nodes first. But how do we know which nodes are best without actually exploring them?

To do this, we repurposed the winning position function from the losing moves section that found sets of three to instead find sets of three in our positions, and count how many there were, then ranked all 7 potential moves based on which one created the most winning opportunities. The nodes were then explored in that order.

## Final Performance
By the end of our project, we had an algorithm that could perfectly evalute positions with under 30 moves remaining in just a few seconds. For context, the board has 42 total spaces on it, and thus the longest possible game is 42 moves long. For positions that were furhter than that, they took a few minutes each, and at each move, the algorithm must evaluate 7 positions (1 for each potential column move). As an academic proof-of-concept, we had fulfilled our goal of creating an optimal solver.

However, for demonstration purposes we felt that it was still a little too slow, so we repurposed our sets-of-three function one more time to score a position based on how many sets of three there were, and then cut off the exploration at 25 moves and returned the score of that position.

While this did mean that the solver was no longer technically perfect, truncating it did allow us to strongly solve the game for those 25 moves (meaning it took the most efficient path towards victory instead of just any path). In practice, as soon as a win was possible within 25 moves, the algorithm would march towards it without fail, which still made it very difficult to beat.

## References
We took inspiration from [Pascal Pons' project](https://blog.gamesolver.org) on solving Connect 4 when developing our algorithm, using some of its key concepts and optimizations in our Go implementation.

[[ PROJECT LINK HERE ]](https://github.com/amit-kumarh/4circle/tree/main/algo)
[^1]: In testing, we found that using bigger cache sizes had a diminishining returns effect, and decided 10 million was a good balance that got us most of the performance gains without increasing memory usage too much.

[^2]: Technically, nodes that are pruned by alpha-beta pruning will only give us an upper bound on the score and not the exact value, so it's not quite as simple as just looking up a position and checking its score, but it still cuts out a huge amount of computation.


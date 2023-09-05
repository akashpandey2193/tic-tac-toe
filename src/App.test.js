import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('Tic-Tac-Toe Game', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('allows players to make moves and checks for a winner', () => {
     render(<App />);

    const square = screen.queryAllByTestId("square");
    fireEvent.click(square[3]);
    fireEvent.click(square[0]);
    fireEvent.click(square[4]);
    fireEvent.click(square[1]);
    fireEvent.click(square[8]);
    fireEvent.click(square[2]);

    const winningPlayerMessage = screen.getByText('Winning Player: O');
    expect(winningPlayerMessage).toBeInTheDocument();
    expect(screen.queryByText('Undo Moves')).toBeNull();
    expect(screen.getByText('Restart Game')).toBeInTheDocument();
  });

  it('allows players to undo moves', () => {
    render(<App />);

    const square = screen.queryAllByTestId("square");
    const undoButton = screen.getByText('Undo Moves');

    // Player X makes move
    fireEvent.click(square[0]);
    //Player O makes move
    fireEvent.click(square[1]);

    fireEvent.click(undoButton);
    expect(square[0].textContent).toBe('X');
    expect(square[1].textContent).toBe('');
  });

  it('resets the game', () => {
    render(<App />);

    const square = screen.queryAllByTestId("square");
    const resetButton = screen.getByText('Reset Game');

    fireEvent.click(square[0]);
    fireEvent.click(square[1]);
    fireEvent.click(square[6]);
    fireEvent.click(square[7]);
    // Reset the game
    fireEvent.click(resetButton);

    // Check that the squares are empty again
    expect(square[0].textContent).toBe('');
    expect(square[1].textContent).toBe('');
    expect(square[6].textContent).toBe('');
    expect(square[7].textContent).toBe('');    

  });

  it('checks for a draw', () => {
    render(<App />);

    const square = screen.queryAllByTestId("square");

    fireEvent.click(square[0]);//X
    fireEvent.click(square[1]);//O
    fireEvent.click(square[4]);//X
    fireEvent.click(square[8]);//O
    fireEvent.click(square[7]);//X

    fireEvent.click(square[6]);//O
    fireEvent.click(square[3]);//X
    fireEvent.click(square[5]);//O
    fireEvent.click(square[2]);//X
    
    const drawMessage = screen.getByText('Sheesh! its a draw');
    expect(drawMessage).toBeInTheDocument();
    expect(screen.queryByText('Undo Moves')).toBeNull();
    expect(screen.getByText('Restart Game')).toBeInTheDocument();
  });
});
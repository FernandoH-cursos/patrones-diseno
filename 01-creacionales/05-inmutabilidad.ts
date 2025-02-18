/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  //* Permite crear una nueva instancia del estado del editor con los cambios indicados y los valores actuales
  copyWith({
    content,
    cursorPosition,
    unsavedChanges,
  }: Partial<CodeEditorState>) {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges
    );
  }

  displayState() {
    console.log(`\n%cEstado del editor`, COLORS.green);
    console.log(`
    Contenido: ${this.content}
    Posición del cursor: ${this.cursorPosition}
    Cambios sin guardar: ${this.unsavedChanges}  
    `);
  }
}

class CodeEditorHistory {
  //* Array de estados del editor para mantener un historial de cambios
  private history: CodeEditorState[] = [];
  //* Índice del estado actual en el historial de cambios del editor
  private currentIndex: number = -1;

  //* Permite guardar un nuevo estado en el historial de cambios del editor y actualizar el índice actual
  save(state: CodeEditorState): void {
    //* Si el índice actual es menor que la longitud del historial, se eliminan los estados futuros
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  //* Permite deshacer un cambio en el editor y actualizar el índice actual 
  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }

    return null;
  }

  //* Permite rehacer un cambio en el editor y actualizar el índice actual
  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    return null;
  }
}

function main() {
  console.log();

  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("console.log('Hola mundo');", 2, false);

  history.save(editorState);

  console.log("%cEstado inicial del editor:", COLORS.blue);
  editorState.displayState();

  editorState = editorState.copyWith({ 
    content: "console.log('Hola mundo');\nconsole.log('Nueva línea');",
    cursorPosition: 3,
    unsavedChanges: true,
  });
  history.save(editorState);

  console.log("%cDespues del primer cambio:", COLORS.blue);
  editorState.displayState();

  editorState = editorState.copyWith({ 
   cursorPosition: 5,
  });
  history.save(editorState);

  console.log("%cDespues de mover el cursor:", COLORS.blue);
  editorState.displayState();

  console.log("%cDeshacer el último cambio:", COLORS.blue);
  editorState = history.undo()!;
  editorState.displayState();

  console.log("%cRehacer el último cambio:", COLORS.blue);
  editorState = history.redo()!;
  editorState.displayState();
  
  console.log();
}

main();

type DraggableState = [number, string];
type DropzoneOptions = {
  dropEffect?: "copy" | "move" | "link" | "none";
  dragover_class?: string;
  on_dropzone?: (state: DraggableState, e: DragEvent) => void;
};
type DropzoneState = {
  dropEffect: "copy" | "move" | "link" | "none";
  dragover_class: string;
  on_dropzone?: (state: DraggableState, e: DragEvent) => void;
};

export function draggable(node: HTMLElement, [id, source]: DraggableState): { update: (state: DraggableState) => void; destroy: () => void; } {
  let state: DraggableState = [id, source];

  node.draggable = true;
  node.style.cursor = 'grab';

  function handle_dragstart(e: DragEvent) {
    if (!e.dataTransfer) return;
    e.dataTransfer.setData('text/plain', JSON.stringify(state));
  }

  node.addEventListener('dragstart', handle_dragstart);

  return {
    update([id, source]: DraggableState) {
      state = [id, source];
    },

    destroy() {
      node.removeEventListener('dragstart', handle_dragstart);
    }
  };
}

export function dropzone(node: HTMLElement, options: DropzoneOptions): { update: (options: DropzoneOptions) => void; destroy: () => void; } {
  let state: DropzoneState = {
    dropEffect: 'move',
    dragover_class: 'droppable',
    ...options
  };

  function handle_dragenter(e: DragEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    e.target.classList.add(state.dragover_class);
  }

  function handle_dragleave(e: DragEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    e.target.classList.remove(state.dragover_class);
  }

  function handle_dragover(e: DragEvent) {
    e.preventDefault();
    if (!e.dataTransfer) return;
    e.dataTransfer.dropEffect = state.dropEffect;
  }

  function handle_drop(e: DragEvent) {
    e.preventDefault();
    if (!e.dataTransfer) return;
    const data = e.dataTransfer.getData('text/plain');
    const _state: DraggableState = JSON.parse(data);
    if (!(e.target instanceof HTMLElement)) return;
    e.target.classList.remove(state.dragover_class);
    state.on_dropzone && state.on_dropzone(_state, e);
  }

  node.addEventListener('dragenter', handle_dragenter);
  node.addEventListener('dragleave', handle_dragleave);
  node.addEventListener('dragover', handle_dragover);
  node.addEventListener('drop', handle_drop);

  return {
    update(options: DropzoneOptions) {
      state = {
        dropEffect: 'move',
        dragover_class: 'droppable',
        ...options
      };
    },

    destroy() {
      node.removeEventListener('dragenter', handle_dragenter);
      node.removeEventListener('dragleave', handle_dragleave);
      node.removeEventListener('dragover', handle_dragover);
      node.removeEventListener('drop', handle_drop);
    }
  };
}
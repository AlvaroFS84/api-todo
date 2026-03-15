"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTodoUseCase = void 0;
class DeleteTodoUseCase {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async execute(id) {
        const existingTodo = await this.todoRepository.findById(id);
        if (!existingTodo) {
            return false;
        }
        return this.todoRepository.delete(id);
    }
}
exports.DeleteTodoUseCase = DeleteTodoUseCase;
//# sourceMappingURL=DeleteTodoUseCase.js.map
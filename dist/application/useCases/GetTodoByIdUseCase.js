"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTodoByIdUseCase = void 0;
class GetTodoByIdUseCase {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async execute(id) {
        return this.todoRepository.findById(id);
    }
}
exports.GetTodoByIdUseCase = GetTodoByIdUseCase;
//# sourceMappingURL=GetTodoByIdUseCase.js.map
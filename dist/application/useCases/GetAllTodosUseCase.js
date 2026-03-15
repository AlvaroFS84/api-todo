"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTodosUseCase = void 0;
class GetAllTodosUseCase {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async execute() {
        return this.todoRepository.findAll();
    }
}
exports.GetAllTodosUseCase = GetAllTodosUseCase;
//# sourceMappingURL=GetAllTodosUseCase.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoUseCase = void 0;
class CreateTodoUseCase {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async execute(props) {
        if (!props.title || props.title.trim().length === 0) {
            throw new Error('Title is required');
        }
        return this.todoRepository.create({
            title: props.title.trim(),
            description: props.description?.trim() || '',
        });
    }
}
exports.CreateTodoUseCase = CreateTodoUseCase;
//# sourceMappingURL=CreateTodoUseCase.js.map
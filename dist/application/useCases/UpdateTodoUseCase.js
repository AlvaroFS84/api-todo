"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoUseCase = void 0;
class UpdateTodoUseCase {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async execute(id, props) {
        const existingTodo = await this.todoRepository.findById(id);
        if (!existingTodo) {
            return null;
        }
        const updatedProps = {};
        if (props.title !== undefined) {
            if (props.title.trim().length === 0) {
                throw new Error('Title cannot be empty');
            }
            updatedProps.title = props.title.trim();
        }
        if (props.description !== undefined) {
            updatedProps.description = props.description.trim();
        }
        if (props.completed !== undefined) {
            updatedProps.completed = props.completed;
        }
        return this.todoRepository.update(id, updatedProps);
    }
}
exports.UpdateTodoUseCase = UpdateTodoUseCase;
//# sourceMappingURL=UpdateTodoUseCase.js.map
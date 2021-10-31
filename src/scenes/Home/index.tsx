import {useDispatch, useSelector} from "react-redux";
import {getErrorSelector, getPendingSelector, getTodosSelector} from "../../store/todo/selectors";
import React, {useEffect} from "react";
import {fetchTodoRequest} from "../../store/todo/actions";
import {Page} from 'decentraland-ui'

export const Home = () => {
    const dispatch = useDispatch();
    const pending = useSelector(getPendingSelector);
    const todos = useSelector(getTodosSelector);
    const error = useSelector(getErrorSelector);

    useEffect(() => {
        dispatch(fetchTodoRequest());
    }, [dispatch]);

    return (
            <>
                <Page>
                    {pending ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error</div>
                    ) : (
                        todos.map((todo, index) => (
                            <div style={{marginBottom: "10px"}} key={todo.id}>
                                {++index}. {todo.title}
                            </div>
                        ))
                    )}
                </Page>
            </>
    );
};

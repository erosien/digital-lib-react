import Button from './Button'
import Input from "./Input"

import { useForm } from "react-hook-form"
import { server_calls } from "../api/server"
import { useDispatch, useStore } from "react-redux"
import { chooseISBN, chooseAuthor, choosePages, chooseTitle, chooseType } from "../redux/slices/RootSlice"

interface BookFormProps {
    id?: string[]
}

const BookForm = (props:BookFormProps) => {
    const { register, handleSubmit } = useForm({})
    const dispatch = useDispatch();
    const store = useStore();

    const onSubmit = (data: any, event: any) => {
        console.log(`ID: ${typeof props.id}`);
        console.log(props.id)
        console.log(data)
        if (props.id && props.id.length > 0) {
            server_calls.update(props.id[0], data)
            console.log(`Updated: ${ data.title } ${ props.id }`)
            setTimeout(() => {window.location.reload()}, 1000);
            event.target.reset()
        } else {
            dispatch(chooseISBN(data.ISBN));
            dispatch(chooseAuthor(data.author));
            dispatch(choosePages(data.pages));
            dispatch(chooseTitle(data.title));
            dispatch(chooseType(data.type));

            server_calls.create(store.getState())
            setTimeout( () => {window.location.reload()}, 1000);
        }
    }

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="ISBN">ISBN</label>
            <Input {...register('ISBN')} name='ISBN' placeholder="ISBN"/>
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <Input {...register('author')} name='author' placeholder="Author"/>
          </div>
          <div>
            <label htmlFor="pages">Pages</label>
            <Input {...register('pages')} name='pages' placeholder="Pages"/>
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <Input  {...register('title')}name='title' placeholder="Title"/>
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <Input  {...register('type')}name='type' placeholder="Type"/>
          </div>
          <div className="flex p-1">
            <Button
              className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
              >
                Submit
            </Button>
          </div>
        </form>
      </div>
    )
}
  
export default BookForm
  
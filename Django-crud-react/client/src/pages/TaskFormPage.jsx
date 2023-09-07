import {useForm} from 'react-hook-form'
import { createTask } from '../api/task.api'
import { deleteTask } from '../api/task.api'
import {useNavigate , useParams} from 'react-router-dom'

export function TaskFormpage() {
  const {register, handleSubmit, formState: {
    errors
  }} = useForm()

  const navigate = useNavigate()
  const params = useParams()


  const onSubmit = handleSubmit (async data=>{
    await createTask(data);
    navigate('/tasks');
 
  })

    return (
      <div>      
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="title"
          {...register('title',{required: true})} />
          {errors.title && <span>este campo es requirido</span> }
          <textarea rows="3" placeholder="Decription"
          {...register('description',{required: true})}></textarea>
          {errors.description && <span>este campo es requirido</span> }

          <button>Save </button>
        </form>

 
        {
          params.id && <button onClick={async()=>{
            const accepted = window.confirm('¿Estas seguro?')
            if (accepted){
              await deleteTask(params.id);
              navigate('/tasks');
            }
          } }>Delete</button>
        }
      </div>

    )
  }
  
  
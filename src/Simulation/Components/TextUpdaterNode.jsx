
import React, { useCallback ,useState , useEffect } from 'react';

const TextUpdaterNode = ({ id, onDeleteText })  => {

  console.log("Type of id:", typeof id);

  // Extract the number part from the id prop
  const idt = typeof id === 'string' ? id.split('_')[1] : '';
  // Define a state to hold the text value
  const [text, setText] = useState('');
  



  const onChange = useCallback((evt) => {
    const newText = evt.target.value;
    setText(newText);
    // Store the text value in localStorage
   localStorage.setItem(`textUpdater_${id}`, newText);
   console.log("kkk",`textUpdater_${id}`)
  }, [idt]);

  // Retrieve the text value from localStorage when the component mounts
  useEffect(() => {
    const storedText = localStorage.getItem(`textUpdater_${id}`);
    if (storedText !== null) {
      setText(storedText);
    }
  }, [id]);


//<button onClick={handleDeleteClick}>Delete</button>
  return (
    <div className="text-updater-node">
      <div>
        <label htmlFor={`text_${idt}`}>Comment:</label>
        <textarea
          id={`text_${idt}`}
          name={`text_${idt}`}
          value={text} // Bind the value to the state
          onChange={onChange}
          className="nodrag"
          rows={4}
          style={{ resize: 'vertical', minHeight: '50px' }}
        />
      </div>
      
     
    </div>
    

  );
};

export default TextUpdaterNode;





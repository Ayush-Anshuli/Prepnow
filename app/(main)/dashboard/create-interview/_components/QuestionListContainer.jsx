import React from 'react'

function QuestionListContainer({questionList}) {
    return (
        <div>
            <h2 className='text-lg font-bold mb-3'>Generated Interview Questions:</h2>
            <div className='mt-5 mb-5 border border-gray-200 rounded-2xl font-inter bg-white'>
                {questionList.map((item, index) => (
                    <div key={index} className='p-3 border border-gray-200 rounded-xl mb-3 m-5'>
                        <h2 className='font-bold'>{item.question}</h2>
                        <p className='text-sm text-primary'>Type: {item?.type}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionListContainer
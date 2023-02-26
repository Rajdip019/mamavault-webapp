/* eslint-disable @next/next/no-img-element */
import { doc } from 'firebase/firestore'
import React from 'react'

// import { Document, Page, pdfjs } from 'react-pdf';
import Tag from './Shared/Tag';
import { format } from 'date-fns';
import { IDocuments } from '@/interfaces/docuemnt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import AttachFileIcon from '@mui/icons-material/AttachFile';

interface Props {
  userDocument: {
    time: number,
    document: IDocuments[]
  }
}

// pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const UserDocument: React.FC<Props> = ({ userDocument }) => {

  const dateFormatted = userDocument.time && format(userDocument.time, 'do LLLLLL, yyyy');

  return (
    <>
      <p className=' text-xl mt-10'>{dateFormatted}</p>
      <div className=' rounded-xl'>
        <div className='my-5 rounded-2xl flex flex-wrap gap-10'>
          {userDocument.document.map((doc) => {
            return (
              <div>
                <div>
                  <div className=''>
                    <p className=" text-2xl  items-center mb-1">{doc.doc_title}</p>
                    <Tag name={doc.doc_type} />
                    {doc.doc_format === 'application/pdf' && (
                      <div className='flex flex-col'>
                        <img src="./pdf.png" alt="" className='w-40 mb-5' />
                      <a href={doc.doc_url} target="_blank">
                        <button className='bg-[#6061F6] py-2 px-6 rounded-full text-white font-semibold mt-2 sm:mt-0'>View Pdf</button>
                      </a>
                      </div>
                    )
                    }
                  </div>
                </div>
                <div>
                  {doc.doc_url ? (
                    <div>
                      {doc.doc_format !== 'application/pdf' && (
                        <a href={doc.doc_url} target="_blank" rel="noreferrer">
                          <img src={doc.doc_url} alt="" className=' w-52 h-52 rounded-xl border-2 border-black mt-8 md:mt-0' />
                        </a>
                      )}
                    </div>
                  ) : (null)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default UserDocument
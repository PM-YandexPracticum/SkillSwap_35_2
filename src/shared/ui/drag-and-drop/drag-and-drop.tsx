import {
  useState,
  type SyntheticEvent,
  type DragEvent,
  useEffect
} from 'react';
import Cross from '../../assets/icons/cross.svg';
import GaleryAdd from '../../assets/icons/gallery-add.svg';
import type { TDragAndDropProps } from './drag-and-drop-types';
import styles from './drag-and-drop.module.scss';

export const DragAndDrop = ({
  onFilesAdded,
  text,
  buttonText
}: TDragAndDropProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (evt: SyntheticEvent) => {
    const input = evt.target as HTMLInputElement;
    const selectedFiles = input.files;

    if (!selectedFiles?.length) return;

    const newFiles = Array.from(selectedFiles);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDrop = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    if (!evt.dataTransfer) return;

    const droppedFiles = evt.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesAdded(files);
  }, [files, onFilesAdded]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={styles.dropZone}
    >
      <p className={styles.dropZoneText}>{text}</p>
      <input
        type='file'
        hidden
        id='browse'
        onChange={handleFileChange}
        accept='.jpg,.jpeg,.png,.bmp'
        multiple
      />
      <label htmlFor='browse' className={styles.dropZoneInput}>
        <GaleryAdd />
        {buttonText}
      </label>
      {files.length > 0 && (
        <div className='file-list'>
          <div className='file-list__container'>
            {files.map((file, index) => (
              <div className='file-item' key={index}>
                <div className='file-info'>
                  <p>{file.name}</p>
                  {/* <p>{file.type}</p> */}
                </div>
                <button
                  className='file-actions'
                  onClick={() => handleRemoveFile(index)}
                >
                  <Cross />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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
  const [onDropZone, setOnDropZone] = useState(false);

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
      setOnDropZone((prev) => !prev);
    }
  };

  const handleDropOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    setOnDropZone((prev) => !prev);
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
      onDragEnter={handleDropOver}
      onDragLeave={handleDropOver}
      onDragOver={(evt) => {
        evt.preventDefault();
      }}
      className={`${styles.dropZone} ${
        files.length > 0 ? styles.dropZoneActive : styles.dropZoneInactive
      } ${onDropZone ? styles.dropZoneReady : styles.dropZoneNotReady}`}
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
        <div className={styles.fileList}>
          <div className={styles.fileListContainer}>
            {files.map((file, index) => (
              <div className={styles.fileItem} key={index}>
                <div className={styles.fileInfo}>
                  <p>{file.name}</p>
                  {/* <p>{file.type}</p> */}
                </div>
                <button
                  className={styles.fileActions}
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

import { BlockMesh } from '../block_mesh';

export abstract class IExporter {
    /** The file type extension of this exporter.
     * @note Do not include the dot prefix, e.g. 'obj' not '.obj'.
     */
    public abstract getFormatFilter(): {
        name: string,
        extension: string,
    }

    /**
     * Export a block mesh to a file.
     * @param blockMesh The block mesh to export.
     * @param filePath The location to save the file to.
     */
    public abstract export(blockMesh: BlockMesh): Buffer;
}

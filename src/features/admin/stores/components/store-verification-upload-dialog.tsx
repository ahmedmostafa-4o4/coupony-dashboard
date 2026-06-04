"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, File as FileIcon } from "lucide-react";

import type { StoresDictionary } from "../utils/get-dictionary";

interface StoreVerificationUploadDialogProps {
  isPending: boolean;
  onUpload: (documentType: string, file: File) => Promise<boolean>;
  dict: StoresDictionary["details"]["verifications"];
}

export function StoreVerificationUploadDialog({
  isPending,
  onUpload,
  dict,
}: StoreVerificationUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [documentType, setDocumentType] = useState<string>("commercial_register");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file || !documentType) return;
    
    const success = await onUpload(documentType, file);
    if (success) {
      setFile(null);
      setDocumentType("commercial_register");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Upload className="mr-2 h-4 w-4" />
          {dict.upload}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dict.uploadDialog.title}</DialogTitle>
          <DialogDescription>
            {dict.uploadDialog.desc}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="document_type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {dict.uploadDialog.documentType}
            </label>
            <Select value={documentType} onValueChange={setDocumentType} disabled={isPending}>
              <SelectTrigger id="document_type">
                <SelectValue placeholder={dict.uploadDialog.selectType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commercial_register">Commercial Register</SelectItem>
                <SelectItem value="tax_card">Tax Card</SelectItem>
                <SelectItem value="id_card_front">ID Card (Front)</SelectItem>
                <SelectItem value="id_card_back">ID Card (Back)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {dict.uploadDialog.file}
            </label>
            {!file ? (
              <div 
                className="mt-1 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-10"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    setFile(e.dataTransfer.files[0]);
                  }
                }}
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-slate-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-slate-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
            ) : (
              <div className="mt-1 flex items-center justify-between rounded-lg border border-slate-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <FileIcon className="h-5 w-5 text-slate-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFile(null)}
                  disabled={isPending}
                >
                  <X className="h-4 w-4 text-slate-500" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
            {dict.uploadDialog.cancel}
          </Button>
          <Button onClick={handleSubmit} disabled={!file || isPending}>
            {isPending ? dict.uploadDialog.uploading : dict.uploadDialog.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

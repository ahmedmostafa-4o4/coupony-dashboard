"use client";

import { useState } from "react";
import { Upload, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { importStores, downloadStoresTemplate } from "../api/import-stores";
import type { StoresDictionary } from "../utils/get-dictionary";

export function ImportStoresDialog({ dict }: { dict: StoresDictionary["list"]["import"] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadTemplate = async () => {
    setIsDownloading(true);
    try {
      await downloadStoresTemplate();
    } catch (error) {
      toast.error("Failed to download template");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await importStores(formData);
      toast.success(dict.successMessage);
      setIsOpen(false);
      setFile(null);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to queue import";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          {dict.title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dict.title}</DialogTitle>
          <DialogDescription>{dict.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="import-file" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{dict.fileLabel}</label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 gap-2 text-xs"
                onClick={handleDownloadTemplate}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Download className="h-3 w-3" />
                )}
                {dict.downloadTemplate}
              </Button>
            </div>
            <Input
              id="import-file"
              type="file"
              accept=".zip"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={!file || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {dict.uploading}
                </>
              ) : (
                dict.uploadBtn
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipePipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}
  transform(value: any, args?: any): any {
    const sanitizedContent = DOMPurify.sanitize(value);
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);;
  }
}

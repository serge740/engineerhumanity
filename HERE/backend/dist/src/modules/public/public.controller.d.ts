import { PublicService } from './public.service';
export declare class PublicController {
    private readonly publicService;
    constructor(publicService: PublicService);
    getLanding(): Promise<{
        slug: string;
        title: string;
    }>;
    getPage(slug: string): Promise<{
        metadata: import("@prisma/client/runtime/library").JsonValue;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
    }>;
}

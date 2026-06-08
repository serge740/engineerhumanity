import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { RequestWithAdmin } from "../../common/interfaces/admin.interface";
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    findAll(siteId: string, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        published: boolean;
        slug: string;
        title: string;
        description: string | null;
        isLanding: boolean;
    }[]>;
    findOne(siteId: string, slug: string, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    create(siteId: string, dto: CreatePageDto, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    update(siteId: string, slug: string, dto: UpdatePageDto, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    publish(siteId: string, slug: string, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    unpublish(siteId: string, slug: string, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    duplicate(siteId: string, slug: string, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        version: number;
        published: boolean;
        siteId: string;
        slug: string;
        title: string;
        description: string | null;
        html: import("@prisma/client/runtime/library").JsonValue;
        isLanding: boolean;
    }>;
    remove(siteId: string, slug: string, req: RequestWithAdmin): Promise<{
        message: string;
    }>;
}
